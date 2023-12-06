export interface IPageLoader {
  content: IPageContent
  isHome?: boolean
}

export interface IPageContent{
  id?:string
  title: string,
  content: string
}

