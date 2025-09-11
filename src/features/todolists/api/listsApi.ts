import { instance } from "../../../common/instance"
import type { BaseResponse, WPList } from "./listsApi.types"

export const listsApi = {
  getLists() {
    return instance.get<WPList[]>("/list")
  },
  createList(payload: { title: string; parent: number }) {
    const { parent, title } = payload
    return instance.post<BaseResponse<{ item: WPList }>>("/list", { title, status: "publish", parent,children:[] })
  },
  deleteList(id: string) {
    return instance.delete<BaseResponse<WPList>>(`/list/${id}`)
  },
  changeListTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse<WPList>>(`/list/${id}`, { title, slug: title })
  },
}
