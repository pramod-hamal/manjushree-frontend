import { PaginationMetaDTO } from "../../auth/interface/api.response";

export interface ContactSliceState {
  individialContactList: [];
  individialContactListPagination: PaginationMetaDTO;
  organizationalContactList: [];
  organizationalContactListPagination: PaginationMetaDTO;
}
