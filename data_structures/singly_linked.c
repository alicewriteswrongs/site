#include "singly_linked.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

/*
 * Singly Linked List
 */
s_list *singly_linked(void *data) {
	s_list *newlist;
	newlist = malloc(sizeof(s_list));

	s_list_node *init;
	init = malloc(sizeof(s_list_node));
	init->next = init;
	init->data = data;

	newlist->head = init;
	newlist->tail = init;

	return newlist;
}

void destroy_s_list(s_list *list) {
	s_list_node *traveller = list->head->next;
	s_list_node *tmp;

	while (traveller != list->head) {
		tmp = traveller->next;
		free(traveller);
		traveller = tmp;
	}
	free(list->head);
	free(list);
}

void s_list_insert(s_list_node *node, void *data) {
	s_list_node *ins;
	ins = malloc(sizeof(s_list_node));
	printf("called");

	ins->data = data;
	ins->next = node->next;
	node->next = ins;
	printf("called");
	/* 	new = malloc(sizeof(s_list_node)); */
	/* 	new->data = data; */
	/* 	new->next = list->head; */

	/* 	list->tail->next = new; */
	/* 	list->tail = new; */
}

void print_s_list_node(s_list_node *node) {
	printf("%s\n", node->data);
}

void print_s_list(s_list *list) {
	s_list_node *traveller = list->head;

	if (traveller->next == traveller) {
		print_s_list_node(traveller);
	} else {
		while (traveller != list->tail) {
			print_s_list_node(traveller);
			traveller = traveller->next;
		}
	}
}

int main() {
	s_list *single = singly_linked("data");
	s_list_insert(single->head, "asdfasdf");
	print_s_list(single);
	destroy_s_list(single);
}
