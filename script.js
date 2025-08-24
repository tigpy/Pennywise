// Get all the necessary DOM elements
const addExpenseBtn = document.getElementById('addExpenseBtn');
const addExpenseModal = document.getElementById('addExpenseModal');
const cancelBtn = document.getElementById('cancelBtn');
const expenseForm = document.getElementById('expenseForm');
const transactionsList = document.getElementById('transactionsList');

// Function to get the appropriate emoji for the category
const getCategoryEmoji = (category) => {
    switch(category) {
        case 'groceries':
            return '🛒';
        case 'dining':
            return '🍽️';
        case 'transportation':
            return '🚗';
        case 'bills':
            return '🧾';
        default:
            return '🛍️';
    }
};

// Show the modal when the "Add Expense" button is clicked
addExpenseBtn.addEventListener('click', () => {
    addExpenseModal.classList.remove('hidden');
});

// Hide the modal when the "Cancel" button is clicked
cancelBtn.addEventListener('click', () => {
    addExpenseModal.classList.add('hidden');
});

// Hide the modal when clicking outside of it
addExpenseModal.addEventListener('click', (e) => {
    if (e.target.id === 'addExpenseModal') {
        addExpenseModal.classList.add('hidden');
    }
});

// Handle form submission and add a new expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value || category.charAt(0).toUpperCase() + category.slice(1);
    const emoji = getCategoryEmoji(category);
    
    // Check if amount is entered
    if (!amount) {
        alert('Please enter an amount.');
        return;
    }

    // Create a new list item for the expense
    const newExpenseItem = document.createElement('li');
    newExpenseItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-50', 'p-4', 'rounded-xl', 'shadow-sm');
    
    // Create the HTML content for the new item
    newExpenseItem.innerHTML = `
        <div class="flex items-center space-x-3">
            <span class="text-lg">${emoji}</span>
            <div>
                <p class="font-medium">${description}</p>
                <p class="text-sm text-gray-500">Just now</p>
            </div>
        </div>
        <span class="text-red-500 font-semibold">- ₹ ${parseFloat(amount).toFixed(2)}</span>
    `;

    // Add the new expense to the top of the list
    if (transactionsList.firstChild) {
        transactionsList.insertBefore(newExpenseItem, transactionsList.firstChild);
    } else {
        transactionsList.appendChild(newExpenseItem);
    }

    // Clear the form and close the modal
    expenseForm.reset();
    addExpenseModal.classList.add('hidden');
    console.log('New expense added.');
});
