
        async function fetchCellValue() {
            const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdO0e7_vV7Vz_CGvvHSlq3LnbZzkfG9dRhK8X3cE3flxF7K7LRbkV2H4qyKWX0DPjrkuVaEUVceC-w/pubhtml';

            try {
                const response = await fetch(sheetUrl);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Assuming the cell you want is in the first table, first row, first cell (A1)
                const cellValue = doc.querySelector('table tbody tr td').innerText;
                console.log(cellValue);
     
            } catch (error) {
                console.error('Error fetching data:', error);
      
            }
        }

        fetchCellValue();

