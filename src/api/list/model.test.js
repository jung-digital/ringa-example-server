import { List } from '.'

let list

beforeEach(async () => {
  list = await List.create({ title: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = list.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(list.id)
    expect(view.title).toBe(list.title)
    expect(view.description).toBe(list.description)
    expect(view.items).toBe(list.items)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = list.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(list.id)
    expect(view.title).toBe(list.title)
    expect(view.description).toBe(list.description)
    expect(view.items).toBe(list.items)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
