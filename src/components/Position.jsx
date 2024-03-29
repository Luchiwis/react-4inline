
export function Position({ children, row, col, command, color }) {
    return (
        <div className="position" style={{ 'backgroundColor': color }} onClick={() => { command(row, col) }}>
            <div className="vertical-center">
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}