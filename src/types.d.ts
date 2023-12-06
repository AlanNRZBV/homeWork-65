
export interface IPageLoader {
  content: IPageContent
  isHome: boolean
}

export interface IPageContent{
  title: string,
  content: string
}

export interface IPagesItem {
  id: string,
  title: string,
  content: string
}

export interface IPagesList {
  [id:string]: IPageContent
}


export  interface IContentTool {
  pages: IPagesItem[]
  onSelect: (selected: IOptions | null)=>void
  selectedValue: string
}
export interface IOptions{
  value: string,
  label: string
}


