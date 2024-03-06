import { TreeData, TreeItem, TreeProps } from './tree-select-types';

export const nodeMap = new Map<string, TreeItem>();

//  广度遍历
export function attributeExtension(data: TreeData, prop: TreeProps): any {
  nodeMap.clear();

  const { label = 'label', children = 'children' } = prop;

  let nodeQueue: TreeData = [];

  //  第一级处理
  let level = 1;
  data.forEach((el) => {
    el.level = level;
    nodeMap.set(el[label], el);
    nodeQueue.push(el);
  });
  //  之后的级别
  while (nodeQueue.length !== 0) {
    level += 1;

    const newQuene: TreeData = [];
    nodeQueue.forEach((node) => {
      node[children]?.forEach((el: TreeItem) => {
        el.level = level;
        el.parent = node;
        nodeMap.set(el[label], el);
        newQuene.push(el);
      });
    });
    nodeQueue = newQuene;
  }
  return data;
}

/**
 * 动态获取class字符串
 * @param classStr 是一个字符串，固定的class名
 * @param classOpt 是一个对象，key表示class名，value为布尔值，true则添加，否则不添加
 * @returns 最终的class字符串
 */
export function className(classStr: string, classOpt?: { [key: string]: boolean }): string {
  let classname = classStr;
  if (typeof classOpt === 'object') {
    Object.keys(classOpt).forEach((key) => {
      classOpt[key] && (classname += ` ${key}`);
    });
  }

  return classname;
}
