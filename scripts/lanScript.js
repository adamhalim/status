async function getData() {
    await fetch('http://localhost:3000/lan')
    .then(response => response.json())
    .then(data => console.log(data));
}