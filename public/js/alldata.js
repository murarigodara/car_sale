window.onload=()=>{
  //var x=50; to be deleted
  document.getElementById('sortField').addEventListener('change', sortData);
function sortData(){
    let key=document.getElementById('sortField').value;
   
    if(key){
     
        const table = document.getElementById('dataTable');
        
        const tbody = table.getElementsByTagName('tbody')[0];
        
        const thead = table.querySelector('thead');
        const headings = Array.from(thead.getElementsByTagName('th')).map(th => th.textContent);
        
        let columnIndex=headings.indexOf(String(key));
        const rows = Array.from(tbody.getElementsByTagName('tr'));
        rows.sort((a, b) => {
            console.log(a.getElementsByTagName('td')[columnIndex].innerText);
            const aValue = a.getElementsByTagName('td')[columnIndex].innerText;
            
            const bValue = b.getElementsByTagName('td')[columnIndex].innerText;
            return aValue.localeCompare(bValue);
          });
          // Remove existing rows from the table
          while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
          }
          // Append the sorted rows back to the table
          rows.forEach(row => tbody.appendChild(row));
    }
}
}



