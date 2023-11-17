#include <stdio.h>

int main() {
    printf("hello world\n");
    long i;
    int iter = 0;
    for (i=0; i<99999999999999; i++) {
        iter ++;
        if (iter > 1000) {
            iter = 0;
            printf("%ld\n", i);
        }
    }
    return 0;
}
