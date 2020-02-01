import React, { useState } from 'react';
import { GridList, Button } from '@material-ui/core';

export default function Board() {
    const [rows, setRows] = useState(20);
    const [cols, setCols] = useState(10);
    const [data, setData] = useState([]);

    const Array2D = (r, c) => [...Array(r)].map(x => Array(c).fill(0));

    const handleSave = () => {
        var out = '';

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++)
                out += (data.includes(r * cols + c) ? 1 : 0) + (c < cols - 1 ? ',' : '');
            out += '\n';
        }

        console.log(out);
    }

    return (
        <div>
            <p>{rows} x {cols}</p>
            <Button variant="outlined" onClick={() => setRows(rows + 1)}>+ row</Button>
            <Button variant="outlined" onClick={() => setCols(cols + 1)}>+ col</Button>
            <Button variant="outlined" onClick={handleSave}>Save</Button>
            <GridList cols={cols} style={{ width: '690px', margin: 'auto' }}>
                {Array(rows * cols).fill().map((_, i) =>
                    <Button
                        key={i}
                        onClick={() => {
                            setData([...data, i]);
                            console.log(data);
                        }}
                        style={{
                            border: '1px solid',
                            width: '50px',
                            height: '64px',
                            margin: '2.5px',
                            background: data.includes(i) ? '#aaa' : 'transparent',
                            color: data.includes(i) ? '#fff' : '#000',
                        }}>
                        {i + 1}
                    </Button>
                )}
            </GridList>
        </div>
    );
}

