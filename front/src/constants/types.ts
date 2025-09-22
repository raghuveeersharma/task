export interface User{
  _id?:number
  name:string
  last_name:string
  age:number|null
  status?:boolean
}
export interface Counts {
  teen: number;
  adult: number;
  old: number;
};

export type TableRowProps = {
  data: User;
  fullName?:string;
  index: number;
};

export type DetailBoxProps = {
  id: string;
  namee: string;
  agee: number | null;
  open: () => void;
  handelDelete: (id: string) => void;
  handelUpdate: (
    id: string,
    user: { name: string; age: number | null }
  ) => void;
};
export type AddUsersProps = {
  open: () => void;
  handelAdd: (data: { id: string; name: string; age: number | null }) => void;
  setBlur: (s: boolean) => void;
};

export interface Theme{
  name:string,
  label:string,
  colors:[string,string,string,string]

}
export interface query{
  name:string,
  status:boolean|null,
  arr:User[]
}

