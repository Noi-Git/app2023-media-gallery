import classNames from 'classnames'

const Skeleton = ({ times }) => {
  const outerClassNames = classNames()
  const innerClassNames = classNames()

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      // (_, i):  _ mean, we don't care about that first argument; we only need index
      return (
        <div key={i} classNames={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      )
    })
  return boxes
}

export default Skeleton
