import { Task } from "./../types/task";
import { QueryKey, useQueryClient } from "react-query";
import { reorder } from "utils/reorder";
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
): any => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.getQueryData(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old: any) => {
    console.log("target", target);
    // 存在问题， id 可能会冲突, 必须加id, 不然循环绑定使用key会报错
    return old
      ? [
          ...old,
          { ...target, id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1 },
        ]
      : [];
  });

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
