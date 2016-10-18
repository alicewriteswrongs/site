#include "singly_linked.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

s_list *singly_linked() {
	s_list *newlist;
	newlist = malloc(sizeof(s_list));

	s_list_node *init;
	init = malloc(sizeof(s_list_node));
	init->next = init;
	newlist->head = init;
	newlist->tail = init;

	return newlist;
}

int main() {
	printf("Hi");
}
