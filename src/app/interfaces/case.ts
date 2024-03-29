export interface Case {
    center: string,
    innerTopLeft: string,
    innerTop: string,
    innerTopRight: string,
    innerRight: string,
    innerBottomRight: string,
    innerBottom: string,
    innerBottomLeft: string,
    innerLeft: string,
    outerTopLeftCorner: string,
    outerTopLeft: string,
    outerTop: string,
    outerTopRight: string,
    outerTopRightCorner: string,
    outerRightTop: string,
    outerRight: string,
    outerRightBottom: string,
    outerBottomRightCorner: string,
    outerBottomRight: string,
    outerBottom: string,
    outerBottomLeft: string,
    outerBottomLeftCorner: string,
    OuterLeftBottom: string,
    outerLeft: string,
    outerLeftTop: string,
    solvability: boolean,
    solutionCells: string[],
    solutionTypes: string[],
    similarity: number,
    fieldRow: number,
    fieldColumn: number
}
