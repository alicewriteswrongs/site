typedef struct node {
    void* data;
    struct node* next;
} node;

typedef struct list {
    node* head;
    node* tail;
} list;
