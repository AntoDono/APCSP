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

    cout << "Minimum Coins - Youwei Zhen" << endl;
    cout << "This program can calculate the minimum amount of coins to make up a given amount of money." << endl;
    cout << "Please enter any amount $: ";
    cin >> input;

    float normalized = input * 100.0; // makes xx.xx become xxxx, where the last two x represents the cents
    target = (int) normalized;

    dp[0] = 0; // there are 0 ways to make $0.00 using any of the coins

    for (int amt = 1; amt <= target; amt++){
        dp[amt] = numeric_limits<long long>::max(); // sets dp[amt] to max value
        for (int cvalue : coins){ // current coin we are using to add to exisiting amt
            if (amt - cvalue >= 0){
                if (debug) cout << "$(cents)" << amt - cvalue << ": " << dp[amt-cvalue] << endl;
                dp[amt] = min(dp[amt-cvalue] + 1, dp[amt]);
            }
        }
        if (debug) cout << "$(cents)" << amt << ": " << dp[amt] << endl;
    }

    cout << "Minimum amount of coins to make up $" << input << ": " << dp[target] << endl;
}