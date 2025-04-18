import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {
    var owner : Principal = Principal.fromText("ytog6-ifb2k-g6oif-5odtc-uibmd-qzzld-ocp56-gzbto-tydo2-jgmfa-gae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "H2H";

    private stable var balanceEntries: [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
           balances.put(owner, totalSupply);
        };
    

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case(?result) result;
        };
        return balance;
    };
    public query func getSymbol() : async Text {
        return symbol;
    };
    public shared(msg) func payOut() : async Text {
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            return result;
        } else {
        return "ALready Redeemed";
    };
    };
    public shared(msg) func transfer(acct : Principal, amount : Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance > amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);
            let toBalance : Nat = await balanceOf(acct);
            let newToBalance : Nat = toBalance + amount;
            balances.put(acct, newToBalance);
            return "success"
        } else {
            return "Insufficient Funds"
        };       
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
           balances.put(owner, totalSupply);
        };
    };
}
