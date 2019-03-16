export class Requisition {
    requisitionId: number;
    class: string;
    reqPracticeName: string;
    section: string;
    storageId: number;
    classHour: string;
    practiceDate: string;
    requistionDate: string;
    statusRequisitionDate: string;
    requisitionStatusId: number;
    requisitionDetails: Array<RequisitionDetails>;
}

export class RequisitionDetails {
    ProductId: number;
    Quantity: number;
    observation: string;
}
