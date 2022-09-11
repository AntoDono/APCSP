#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

const int max_amt = 1e8; // last two zero reserved for cents

long long dp[max_amt], target;
vector<int> coins = { 1, 5, 10, 25 };

float input;

bool debug = true;

int main(){

    cout << "Dynamic Solver - Youwei Zhen" << endl;
    cout << "This program can calculate the total number of ways you can make up any amount of money." << endl;
    cout << "Please enter any amount $: ";
    cin >> input;

    float normalized = input * 100.0; // makes xx.xx become xxxx, where the last two x represents the cents
    target = (int) normalized;

    dp[0] = 1;

    for (int amt = 1; amt <= target; amt++){
        for (int cvalue : coins){ // current coin we are using to add to exisiting amt
            if (amt - cvalue >= 0){
                if (debug) cout << dp[amt - cvalue] << " ways to make $ (cents)" << amt - cvalue << endl;
                if (debug) cout << dp[amt] << " ways to make $ (cents)" << amt << endl;
                dp[amt] += dp[amt-cvalue];
            }
        }
        if (debug) cout << "$ (cents)" << amt << ": " << dp[amt] << endl;
        if (debug) cout << endl;
    }

    cout << "Total ways to make up $" << input << ": " << dp[target] << endl;
}