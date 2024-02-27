type dataType = {
    heading: number;
    accuracy: number;
};
declare const CompassHeadingCallback: {
    start: (updateRate: number, callback: (data: dataType) => void) => () => void;
};
export default CompassHeadingCallback;
//# sourceMappingURL=index.d.ts.map