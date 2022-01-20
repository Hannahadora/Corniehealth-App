export interface Tag {
  name: string;
  orgId: string;
  id?: string;
}

export interface Category {
  name: string;
  id: string;
}

export interface ILevel {
  name: string;
  categoryId: string;
  category?: Category;
  levelTags: Tag[];
  id?: string;
  orgId: string;
}

export interface LevelCollection {
  level?: ILevel;
  name?: string;
  categoryId?: string;
  category?: Category;
  levelTags?: Tag[];
  orgId: string;
  tags?: Tag[];
  id?: string;
}
