const API_URL = 'http://localhost:3000';

export async function lisLogsEntries(){
    const response = await fetch(`${API_URL}/api/logs`)
    return response.json();
}