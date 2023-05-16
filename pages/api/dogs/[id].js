const dogsInfo = [
  { id: 1, name: 'Border Collie', age: 1, size: 'middle' },
  { id: 2, name: '金毛', age: 2, size: 'middle' },
]

export default function handler(req, res) {
  const { id } = req.query
  const target = dogsInfo.find(item => item.id === Number.parseInt(id))
  if (!target) {
    return res.status(404).json({
      msg: 'not found dogInfo with id: ' + id,
    })
  }
  return res.json(target)
}
