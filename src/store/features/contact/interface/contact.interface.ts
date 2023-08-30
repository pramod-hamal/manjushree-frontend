import { PaginationMetaDTO } from "@/core/interface/pagination.metaleanq_support_coordinator";

export interface ContactSliceState {
  individialContactList: [];
  individialContactListPagination: PaginationMetaDTO;
  organizationalContactList: [];
  organizationalContactListPagination: PaginationMetaDTO;
}
