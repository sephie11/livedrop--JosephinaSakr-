import { describe, it, expect, vi } from 'vitest'
import { askSupport } from './engine'
import * as api from '../lib/api'

describe('assistant engine', () => {
  it('returns a known policy answer with citation [Qxx]', async () => {
    const res = await askSupport('How do I add an item to cart?')
    expect(res.text).toContain('Add to cart')
    expect(res.text).toMatch(/\[Q\d{2}\]/)
  })

  it('refuses out-of-scope questions', async () => {
    const res = await askSupport('Can you browse the web and fetch me the price of bitcoin?')
    expect(res.text.toLowerCase()).toContain('out of scope')
  })

  it('includes masked order status and a citation when order id present', async () => {
    const mockStatus = { status: 'Shipped', carrier: 'UPS', eta: new Date().toISOString() }
    const spy = vi.spyOn(api, 'getOrderStatus').mockResolvedValue(mockStatus as any)
    const res = await askSupport('What is the status of order ABCDEFGHIJ123?')
    expect(res.text).toMatch(/Order .*\d{4}/)
    expect(res.text).toContain('Shipped')
    
    spy.mockRestore()
  })
})
