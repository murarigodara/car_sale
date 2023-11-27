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
           
            let aValue = a.getElementsByTagName('td')[columnIndex].innerText;
            
            let bValue = b.getElementsByTagName('td')[columnIndex].innerText;
            
            if(!Number.isNaN(Number(aValue))&& !Number.isNaN(Number(bValue) )){
              console.log("number is hit")
              return parseFloat(aValue)-parseFloat(bValue);
            }

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



