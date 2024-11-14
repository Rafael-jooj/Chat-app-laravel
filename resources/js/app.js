/**
 * Load all of this project's JavaScript dependencies which
 * includes Vue and other libraries.
 */
import './bootstrap';
import { createApp } from 'vue';
import axios from 'axios';

/**
 * Import Vue components
 */
import ExampleComponent from './components/ExampleComponent.vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';

/**
 * Create a new Vue 3 application instance and register components
 */
const app = createApp({
    data() {
        return {
            messages: []
        };
    },
    created() {
        this.fetchMessages();
        window.Echo.private('chat')
        .listen('MessageSent', (e) => {
            this.messages.push({
            message: e.message.message,
            user: e.user
            });
        });

    },
    methods: {
        fetchMessages() {
            // GET request to fetch all chat messages
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },
        addMessage(message) {
            // Add the new message to the messages array
            this.messages.push(message);
            // POST the new message to the server
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
});

/**
 * Register the components with the app instance
 */
app.component('example-component', ExampleComponent);
app.component('chat-messages', ChatMessages);
app.component('chat-form', ChatForm);

/**
 * Mount the Vue instance to the #app element
 */
app.mount('#app');
