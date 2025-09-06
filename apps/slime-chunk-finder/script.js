const findChunksButton = document.getElementById('findChunks');
const statusDiv = document.getElementById('status');
const resultsTableDiv = document.getElementById('resultsTable');

function renderResults(results) {
    if (!results || results.length === 0) {
        resultsTableDiv.innerHTML = '';
        return;
    }
    let tableHTML = `
        <table>
            <tr>
                <th>Rank</th>
                <th>Slime Chunks in Range</th>
                <th>Chunk Coords (X, Z)</th>
                <th>Block Coords (X, Z)</th>
            </tr>`;

    results.forEach((result, index) => {
        const blockX = result.chunk.x * 16 + 8;
        const blockZ = result.chunk.z * 16 + 8;
        const seed = document.getElementById('seedInput').value;
        const chunkbaseUrl = `https://www.chunkbase.com/apps/slime-finder#seed=${seed}&platform=java&x=${blockX}&z=${blockZ}&zoom=1`;

        tableHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${result.slimeCount}</td>
                <td><a href="${chunkbaseUrl}" target="_blank" title="View on Chunkbase">${result.chunk.x}, ${result.chunk.z}</a></td>
                <td>${blockX}, ${blockZ}</td>
            </tr>`;
    });
    tableHTML += '</table>';
    resultsTableDiv.innerHTML = tableHTML;
}

findChunksButton.addEventListener('click', async () => {
    const seed = document.getElementById('seedInput').value; // Keep as string
    const startRadius = parseInt(document.getElementById('startRadiusInput').value, 10);
    const endRadius = parseInt(document.getElementById('endRadiusInput').value, 10);

    if (!seed) {
        statusDiv.textContent = 'Please enter a seed.';
        return;
    }
    statusDiv.textContent = '';
    resultsTableDiv.innerHTML = '';
    findChunksButton.disabled = true;

    const apiUrl = 'https://slime-area-finder.onrender.com/find-optimal-chunk';
    let leftover = '';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seed: seed, startRadius: startRadius, endRadius: endRadius })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Server error (${response.status}): ${errorData.error}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = leftover + decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            leftover = lines.pop();

            for (const line of lines) {
                if (line.trim() === '') continue;
                try {
                    const data = JSON.parse(line);
                    if (data.results) {
                        renderResults(data.results);
                    } else if (data.progress) {
                        statusDiv.textContent = `Scanning... Current Radius: ${data.progress.currentRadius} / ${data.progress.endRadius}`;
                    } else if (data.message) {
                        statusDiv.textContent = data.message;
                    } else if (data.error) {
                        throw new Error(data.error);
                    }
                } catch (e) {
                    console.warn("Could not parse JSON line:", line);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        statusDiv.textContent = "An error occurred: " + error.message;
    } finally {
        findChunksButton.disabled = false;
    }
});
