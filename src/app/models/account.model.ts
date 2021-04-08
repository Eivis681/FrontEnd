export interface IAccountData{
    accountGuid: string ;
    employerName: string ;
    contact?: IContact[] ;
}

export interface IContact{
    contactGuid: string ;
    fullName: string ;
}

