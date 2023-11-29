export default interface Route {
    path: string,
    name?: string,
    element: React.ReactNode,
    children?: React.ReactNode
}
