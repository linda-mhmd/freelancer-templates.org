// Verification test for Task 10.1 - Registry Index
import { describe, it, expect } from 'vitest';
import { registry, agentApi, COMBINATION_COUNT } from '../_shared/registry/index';

describe('Registry Index Verification (Task 10.1)', () => {
  it('has 10 shells registered', () => {
    expect(registry.shells.size).toBe(10);
  });

  it('has 30+ atoms registered', () => {
    expect(registry.atoms.size).toBeGreaterThanOrEqual(30);
  });

  it('has 15+ molecules registered', () => {
    expect(registry.molecules.size).toBeGreaterThanOrEqual(15);
  });

  it('has 60+ themes registered (7 hand-crafted + generated)', () => {
    expect(Object.keys(registry.themes).length).toBeGreaterThanOrEqual(60);
  });

  it('preserves all 7 hand-crafted themes', () => {
    const handCrafted = ['dark', 'clean', 'bold', 'warm', 'minimal', 'neon', 'lindamohamed'];
    for (const name of handCrafted) {
      expect(registry.themes[name]).toBeDefined();
    }
  });

  it('has 1000+ valid combinations', () => {
    expect(COMBINATION_COUNT).toBeGreaterThanOrEqual(1000);
  });

  it('exports a working AgentAPI with correct counts', () => {
    const counts = agentApi.getCounts();
    expect(counts.total).toBe(COMBINATION_COUNT);
    expect(counts.filtered).toBe(COMBINATION_COUNT);
  });

  it('AgentAPI can list all combinations', () => {
    const all = agentApi.listCombinations();
    expect(all.length).toBe(COMBINATION_COUNT);
  });

  it('AgentAPI can get a random combination', () => {
    const combo = agentApi.getRandomCombination();
    expect(combo).toBeDefined();
    expect(combo.id).toBeTruthy();
    expect(combo.template).toBeTruthy();
    expect(combo.shell).toBeTruthy();
    expect(combo.theme).toBeTruthy();
  });

  it('COMBINATION_COUNT matches registry.combinations.length', () => {
    expect(COMBINATION_COUNT).toBe(registry.combinations.length);
  });
});
