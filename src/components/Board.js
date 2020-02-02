import React, { useState } from 'react';
import { GridList, Button } from '@material-ui/core';

const Array2D = (r, c) => [...Array(r)].map(x => Array(c).fill(0));

export default function Board() {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(10);
    const [obs, setObs] = useState([]);
    const [gem, setGem] = useState([]);
    const [grid, setGrid] = useState(Array2D(rows, cols));

    const handleSave = () => {
        var out = '';

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++)
                out += (grid[r][c]) + (c < cols - 1 ? ',' : '');
            out += '\n';
        }

        console.log(out);
    }

    console.log(grid);

    return (
        <div>
            <p>{rows} x {cols}</p>
            <Button variant="outlined" onClick={() => setRows(rows + 1)}>+ row</Button>
            <Button variant="outlined" onClick={() => setCols(cols + 1)}>+ col</Button>
            <Button variant="outlined" onClick={handleSave}>Save</Button>
            <GridList cols={cols} style={{ width: '690px', margin: 'auto' }}>
                {Array(rows * cols).fill().map((_, i) => {
                    var r = (i - (i % cols)) / cols, c = i % cols;
                    return <Button
                        key={i}
                        onClick={() => {
                            grid[r][c] = (grid[r][c] + 1) % 3; setGrid(grid);
                            if (grid[r][c] === 0) {
                                setGem(gem => gem.filter(j => i != j));
                            } else if (grid[r][c] === 1) {
                                setObs(obs => [...obs, i]);
                            } else {
                                setObs(obs => obs.filter(j => i != j));
                                setGem(gem => [...gem, i]);
                            }
                        }}
                        style={{
                            border: '1px solid',
                            width: '50px',
                            height: '64px',
                            margin: '2.5px',
                            background: obs.includes(i) ? 'grey' : gem.includes(i) ? 'orange' : 'transparent',
                        }}>
                        {grid[r][c]}
                    </Button>
                })}
            </GridList>
        </div>
    );
}

