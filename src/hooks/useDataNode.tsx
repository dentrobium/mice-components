import { DataNode } from "antd/es/tree";

const useDataNode = () => {
    const updateNode = (tree: DataNode[], newNode: DataNode) => {
        if (!tree.length) return tree;
        const treeCopy = [...tree];
        const ancestor = treeCopy.find((node: DataNode) =>
            String(newNode.key).startsWith(String(node.key)),
        );
        if (!ancestor) return treeCopy;
        if (ancestor.key === newNode.key) {
            const index = treeCopy.indexOf(ancestor);
            treeCopy[index] = {
                ...ancestor,
                ...newNode
            }
        }
        const children = updateNode(ancestor?.children || [], newNode);
        ancestor.children = children;
        return treeCopy;
    };

    return {
        updateNode,
    };
};

export default useDataNode;
