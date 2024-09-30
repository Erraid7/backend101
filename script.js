function fetchDataPromise() {
    fetch('https://dummyjson.com/c/33f9-885b-4f05-aef4')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

async function fetchData() {
    try {
      let response = await fetch('https://dummyjson.com/c/33f9-885b-4f05-aef4');
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Error fetching data');
      console.error('Error:', error);
    }
  }

function promiseExample() {
let myPromise = new Promise((resolve, reject) => {
    let success = true; // simulate success or failure
    if (success) {
        resolve("Operation Successful");
    } else {
        reject("Operation Failed");
    }
    });
    
    myPromise
    .then(result => console.log(result))   // Runs if resolved
    .catch(error => console.log(error));   // Runs if rejected
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function dailyRoutine() {
try {
    console.log('Starting the day...');
    
    await delay(1000);  // Simulate delay for waking up
    console.log('1. Wake up');
    
    await delay(2000);  // Simulate delay for practicing sports
    console.log('2. Practice sport');
    
    await delay(1500);  // Simulate delay for doing homework
    console.log('3. Do my homework');
    
    console.log('Day complete!');
} catch (error) {
    console.error('Error:', error);
}
}
