export const taskStatuses = [
  "PENDING",
  "IN_PROGRESS",
  "DONE",
  "ARCHIVED",
] as const;
type TaskStatus = (typeof taskStatuses)[number];

export function isValidStatusTransition(
  from: TaskStatus,
  to: TaskStatus,
): boolean {
  const order: TaskStatus[] = ["PENDING", "IN_PROGRESS", "DONE", "ARCHIVED"];
  const fromIdx = order.indexOf(from);
  const toIdx = order.indexOf(to);
  if (fromIdx === -1 || toIdx === -1) return false;
  return toIdx === fromIdx + 1;
}
