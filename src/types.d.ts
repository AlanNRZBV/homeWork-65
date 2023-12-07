import React from "react";

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
  onSubmit: ()=>void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
  pageData: IPageContent
  reset: ()=>void
}
export interface IOptions{
  value: string,
  label: string
}

export interface ICustomNavLink {
  link: string
}

export interface IToggle {
  nav: boolean,
  pageItem: boolean
}


