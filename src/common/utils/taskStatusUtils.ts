import { TaskStatus } from '../enums'

export const normalizeTaskStatus = (status: any): TaskStatus => {
  if (status === undefined || status === null) {
    return TaskStatus.Active // Default value
  }
  
  // Convert both string "2" and number 1 to proper TaskStatus
  const numericStatus = typeof status === 'string' 
    ? parseInt(status, 10) 
    : Number(status)
  
  // Ensure it's a valid TaskStatus value
  return (numericStatus === TaskStatus.Active || numericStatus === TaskStatus.Done) 
    ? numericStatus 
    : TaskStatus.Active
}

