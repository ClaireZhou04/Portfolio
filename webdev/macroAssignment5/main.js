const button_add = document.getElementById('button_add');
const panel_add_new_item = document.getElementById('panel_add_new_item');
const item_cancel = document.getElementById('item_cancel');
const item_add = document.getElementById('item_add');
const panel_item_container = document.getElementById('panel_item_container');
const item_title = document.getElementById('item_title');
const item_category = document.getElementById('item_category');
const item_description = document.getElementById('item_description');
const filter = document.getElementById('filter');

let activities = [];

button_add.onclick = function() {
    panel_add_new_item.classList.remove('hidden');
};


item_cancel.onclick = function(event) {
    event.preventDefault();
    panel_add_new_item.classList.add('hidden');
};


item_add.onclick = function(event) {
    event.preventDefault();

    const title = item_title.value;
    const category = item_category.value;
    const description = item_description.value;
    const createdAt = new Date();

    if (!title || !category || !description) {
        alert('Please fill in all fields.');
        return;
    }

    const newItem = createItem(title, category, description, createdAt);
    activities.push(newItem);

    panel_item_container.appendChild(newItem.element);
    panel_add_new_item.classList.add('hidden');
    item_title.value = '';
    item_description.value = '';
};


function createItem(title, category, description, createdAt) {
    const item = {
        title,
        category,
        description,
        createdAt,
        completed: false, 
        element: document.createElement('div')
    };


    item.element.classList.add('tile', category); 
    item.element.innerText = title;
    item.element.dataset.createdAt = createdAt.toISOString();
    item.element.dataset.category = category;


    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    completeButton.innerText = 'Complete';
    completeButton.onclick = function(event) {
        event.stopPropagation(); 
        item.completed = !item.completed;

        if (item.completed) {
            item.element.classList.add('completed'); 
            completeButton.innerText = 'Undo';
        } else {
            item.element.classList.remove('completed');
            completeButton.innerText = 'Complete';
        }

        filterItems(); 
    };
    item.element.appendChild(completeButton);

    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'X';
    deleteButton.onclick = function(event) {
        event.stopPropagation();
        item.element.remove();
        activities = activities.filter(i => i !== item);
        filterItems();
    };
    item.element.appendChild(deleteButton);

    item.element.onclick = function(event) {
        if (!event.target.classList.contains('complete-button') && !event.target.classList.contains('delete-button')) {
            showDescriptionPopup(item);
        }
    };

    return item;
}


function showDescriptionPopup(item) {
    const popup = document.createElement('div');
    popup.classList.add('description-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${item.title}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Created:</strong> ${new Date(item.createdAt).toLocaleString()}</p>
            <p><strong>Last Accessed:</strong> ${new Date().toLocaleString()}</p>
            <button onclick="closeDescriptionPopup()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
}


function closeDescriptionPopup() {
    document.querySelector('.description-popup').remove();
}


filter.addEventListener('change', function() {
    const selectedCategory = filter.value;

    panel_item_container.innerHTML = '';
    const filteredItems = activities.filter(item => 
        (selectedCategory === 'all' || item.category === selectedCategory || selectedCategory === 'Completed' || selectedCategory === 'Un-completed') &&
        (selectedCategory === 'Completed' ? item.completed : selectedCategory === 'Un-completed' ? !item.completed : true)
    );

    filteredItems.forEach(item => {
        panel_item_container.appendChild(item.element);
    });
});


function filterItems() {
    const selectedCategory = filter.value;
    panel_item_container.innerHTML = '';

    const filteredItems = activities.filter(item => 
        (selectedCategory === 'all' || item.category === selectedCategory || selectedCategory === 'Completed' || selectedCategory === 'Un-completed') &&
        (selectedCategory === 'Completed' ? item.completed : selectedCategory === 'Un-completed' ? !item.completed : true)
    );

    filteredItems.forEach(item => {
        panel_item_container.appendChild(item.element);
    });
}
