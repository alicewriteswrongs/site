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
	print_s_list(single);
	free(single);
}
