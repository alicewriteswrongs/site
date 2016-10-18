typedef struct s_list_node {
	void *data;
	struct s_list_node *next;
} s_list_node;

typedef struct s_list {
	s_list_node *head;
	s_list_node *tail;
} s_list;

s_list *singly_linked();
