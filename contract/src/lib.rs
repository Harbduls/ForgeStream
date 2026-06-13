#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, Map, Vec, String,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Escrow {
    pub buyer: Address,
    pub seller: Address,
    pub amount: i128,
    pub is_funded: bool,
    pub is_released: bool,
    pub is_refunded: bool,
    pub deadline: u64,
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    pub fn create_escrow(
        env: Env,
        buyer: Address,
        seller: Address,
        amount: i128,
        deadline: u64,
    ) -> u64 {
        buyer.require_auth();
        
        let escrow_id = env.storage().instance().get::<_, u64>(&String::from_str(&env, "next_id")).unwrap_or(1);
        
        let escrow = Escrow {
            buyer: buyer.clone(),
            seller: seller.clone(),
            amount,
            is_funded: false,
            is_released: false,
            is_refunded: false,
            deadline,
        };
        
        let mut escrows: Map<u64, Escrow> = env.storage().instance().get(&String::from_str(&env, "escrows")).unwrap_or(Map::new(&env));
        escrows.set(escrow_id, escrow);
        env.storage().instance().set(&String::from_str(&env, "escrows"), &escrows);
        env.storage().instance().set(&String::from_str(&env, "next_id"), &(escrow_id + 1));
        
        escrow_id
    }

    pub fn deposit_funds(env: Env, escrow_id: u64) {
        let mut escrows: Map<u64, Escrow> = env.storage().instance().get(&String::from_str(&env, "escrows")).unwrap_or(Map::new(&env));
        let mut escrow = escrows.get(escrow_id).expect("Escrow not found");
        
        escrow.buyer.require_auth();
        
        if escrow.is_funded {
            panic!("Escrow already funded");
        }
        if escrow.is_released || escrow.is_refunded {
            panic!("Escrow already completed");
        }
        
        escrow.is_funded = true;
        escrows.set(escrow_id, escrow);
        env.storage().instance().set(&String::from_str(&env, "escrows"), &escrows);
    }

    pub fn release_funds(env: Env, escrow_id: u64) {
        let mut escrows: Map<u64, Escrow> = env.storage().instance().get(&String::from_str(&env, "escrows")).unwrap_or(Map::new(&env));
        let mut escrow = escrows.get(escrow_id).expect("Escrow not found");
        
        escrow.buyer.require_auth();
        
        if !escrow.is_funded {
            panic!("Escrow not funded");
        }
        if escrow.is_released || escrow.is_refunded {
            panic!("Escrow already completed");
        }
        
        escrow.is_released = true;
        escrows.set(escrow_id, escrow);
        env.storage().instance().set(&String::from_str(&env, "escrows"), &escrows);
    }

    pub fn refund_funds(env: Env, escrow_id: u64) {
        let mut escrows: Map<u64, Escrow> = env.storage().instance().get(&String::from_str(&env, "escrows")).unwrap_or(Map::new(&env));
        let mut escrow = escrows.get(escrow_id).expect("Escrow not found");
        
        let current_timestamp = env.ledger().timestamp();
        
        if !escrow.is_funded {
            panic!("Escrow not funded");
        }
        if escrow.is_released || escrow.is_refunded {
            panic!("Escrow already completed");
        }
        if current_timestamp < escrow.deadline {
            panic!("Deadline not reached yet");
        }
        
        escrow.is_refunded = true;
        escrows.set(escrow_id, escrow);
        env.storage().instance().set(&String::from_str(&env, "escrows"), &escrows);
    }

    pub fn get_escrow(env: Env, escrow_id: u64) -> Escrow {
        let escrows: Map<u64, Escrow> = env.storage().instance().get(&String::from_str(&env, "escrows")).unwrap_or(Map::new(&env));
        escrows.get(escrow_id).expect("Escrow not found")
    }

    pub fn get_all_escrows(env: Env) -> Vec<Escrow> {
        let escrows: Map<u64, Escrow> = env.storage().instance().get(&String::from_str(&env, "escrows")).unwrap_or(Map::new(&env));
        let mut result = Vec::new(&env);
        for (_id, escrow) in escrows.iter() {
            result.push_back(escrow);
        }
        result
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_escrow_workflow() {
        let env = Env::default();
        let contract_id = env.register_contract(None, EscrowContract);
        let client = EscrowContractClient::new(&env, &contract_id);

        let buyer = Address::generate(&env);
        let seller = Address::generate(&env);
        let deadline = env.ledger().timestamp() + 1000;

        let escrow_id = client.create_escrow(&buyer, &seller, &1000, &deadline);

        let escrow = client.get_escrow(&escrow_id);
        assert_eq!(escrow.buyer, buyer);
        assert_eq!(escrow.seller, seller);
        assert_eq!(escrow.amount, 1000);
        assert_eq!(escrow.is_funded, false);
        assert_eq!(escrow.is_released, false);
        assert_eq!(escrow.is_refunded, false);

        client.deposit_funds(&escrow_id);
        let escrow = client.get_escrow(&escrow_id);
        assert_eq!(escrow.is_funded, true);

        client.release_funds(&escrow_id);
        let escrow = client.get_escrow(&escrow_id);
        assert_eq!(escrow.is_released, true);
    }
}
