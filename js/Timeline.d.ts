import Node from './Node';
declare class Timeline {
    private _latest;
    private _earliest;
    private _tree;
    constructor();
    get earliest(): Node | null;
    get latest(): Node | null;
    private _append;
    private _prepend;
    private _createReferenceIfDoesNotExist;
    private _recordAtCorrespondingTreeNode;
    set(time: Date, value: any): Node;
    get(time: Date): Node[] | undefined;
}
export default Timeline;
