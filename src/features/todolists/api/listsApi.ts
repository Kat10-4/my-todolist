import type { TaskStatus } from "../../../common/enums"
import { instance } from "../../../common/instance"
import type { BaseResponse, WPList } from "./listsApi.types"

export const listsApi = {
  getLists() {
    return instance.get<WPList[]>("/list")
  },
  createList(payload: { title: string; parent: number }) {
    const { parent, title } = payload
    return instance.post<WPList>("/list", { title, status: "publish", parent, children: [] })
  },
  deleteList(id: string) {
    return instance.delete<WPList>(`/list/${id}`)
  },
  changeListTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<WPList>(`/list/${id}`, { title, slug: title })
  },
  updateListStatus(payload: { id: string; status: TaskStatus }) {
    const { id, status } = payload
    return instance.put<WPList>(`/list/${id}`, {
      acf: { status },
    })
  },
}
