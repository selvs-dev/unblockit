package com.s3lv1n.unblockit;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.s3lv1n.unblockit");

        noClasses()
            .that()
            .resideInAnyPackage("com.s3lv1n.unblockit.service..")
            .or()
            .resideInAnyPackage("com.s3lv1n.unblockit.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.s3lv1n.unblockit.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
