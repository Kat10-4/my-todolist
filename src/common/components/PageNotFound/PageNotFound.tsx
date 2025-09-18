import { Button, Container, ThemeProvider} from "@mui/material"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"
import { Path } from "../../routing"

export const PageNotFound = () => (
  <Container
    sx={{ maxWidth: "550px", display: "flex", flexDirection: "column", justifyContent: "center" ,gap:"30px"}}
    maxWidth={false}
  >
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button className={styles.button} component={Link} to={Path.Main} color={'info'}>
      Revert to Main Screen
    </Button>
  </Container>
)
