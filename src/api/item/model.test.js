import { Item } from '.'

let item

beforeEach(async () => {
  item = await Item.create({ title: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = item.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.title).toBe(item.title)
    expect(view.description).toBe(item.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = item.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(item.id)
    expect(view.title).toBe(item.title)
    expect(view.description).toBe(item.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
