import classNames from 'classnames'

const Skeleton = ({ times }) => {
  /* === first solution
  const boxes = []

  for (let i = 0; i < times; i++) {
    boxes.push(<div key={i}></div>)
  }

  return boxes
  */

  // this one below is doing the exact same thing with the for...loop
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      // (_, i):  _ mean, we don't care about that first argument; we only need index
      return (
        <div key={i}>
          <div />
        </div>
      )
    })
  return boxes
}

export default Skeleton
