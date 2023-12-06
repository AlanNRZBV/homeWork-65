export interface IPageLoader {
  content: IPageContent
}

export interface IPageContent{
  id?:string
  title: string,
  content: string
}

